import { useEffect, useContext } from "react";
import { AppContext } from "../Context.tsx/appContext";
import { Appointment, SchedulerChanges } from "../../Types/types";
import {
	addDataToFirestore,
	fetchAppointments,
	deleteEventFromFirestore,
	updateEventInFirestore,
} from "../utilities/firebaseService";
import { ViewComponent } from "../view/View";

export const SchelduerComponent: React.FC = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("Komponent musi być używany wewnątrz AppProvider");
	}
	const { setAppointments, convertedData } = context;

	const handleSchedulerChange = (changes: SchedulerChanges) => {
		switch (true) {
			case !!changes.deleted:
				deleteEventFromFirestore(changes.deleted as string, setAppointments);
				break;

			case !!changes.added:
				addDataToFirestore(changes.added, setAppointments);
				break;
			case !!changes.changed:
				const entries = Object.entries(changes.changed);
				for (const [id, updatedData] of entries) {
					if (
						typeof id === "string" &&
						typeof updatedData === "object" &&
						updatedData !== null
					) {
						updateEventInFirestore(
							{ id, ...updatedData } as Appointment,
							setAppointments
						);
					}
				}
				break;

			default:
				console.log("Nieznana akcja:", changes);
				break;
		}
	};

	useEffect(() => {
		fetchAppointments(setAppointments);
	}, []);

	return (
		<>
			<ViewComponent
				convertedData={convertedData}
				handleSchedulerChange={handleSchedulerChange}
			/>
		</>
	);
};
