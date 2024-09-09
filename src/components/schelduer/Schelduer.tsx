import { useState, useEffect } from "react";
import {
	collection,
	getDocs,
	deleteDoc,
	updateDoc,
	doc,
	addDoc,
} from "firebase/firestore";
import { db } from "../utilities/firebaseConfig";
import {
	EditingState,
	ViewState,
	IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	DayView,
	WeekView,
	MonthView,
	Toolbar,
	ViewSwitcher,
	DateNavigator,
	TodayButton,
	AppointmentTooltip,
	Appointments,
	AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import firebase from "firebase/compat/app";
import { AppointmentComponent } from "../appoitments/appoitments";

interface AppointmentData {
	id: string;
	title: string;
	startDate: firebase.firestore.Timestamp;
	endDate: firebase.firestore.Timestamp;
	notes: string;
}

interface ConvertedAppointment {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	notes: string;
}
interface SchedulerChanges {
	deleted?: string | number; // Zakładamy, że id usuwanego wydarzenia to string
	added?: any; // Możesz dodać inne typy, jak edytowanie, np. added, changed
	changed?: any;
}
interface Data {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	notes: string;
}

export const SchelduerComponent: React.FC = () => {
	const [data, setData] = useState<AppointmentData[]>([]);
	const [convertedData, setConvertedData] = useState<ConvertedAppointment[]>(
		[]
	);
	const today = new Date();

	const fetchEvents = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "appointments")); // Pobiera kolekcję 'events'
			const fetchedEvents: AppointmentData[] = [];
			querySnapshot.forEach((doc) => {
				fetchedEvents.push({ id: doc.id, ...doc.data() } as AppointmentData);
			});
			setData(fetchedEvents);
		} catch (error) {
			console.error("Error fetching events: ", error);
		}
	};

	const handleSchedulerChange = (changes: SchedulerChanges) => {
		switch (true) {
			case !!changes.deleted:
				deleteEventFromFirestore(changes.deleted as string);
				break;

			case !!changes.added:
				addDataToFirestore(changes.added);
				break;
			case !!changes.changed:
				const entries = Object.entries(changes.changed);
				for (const [id, updatedData] of entries) {
					updateEventInFirestore({ id, ...updatedData } as Data);
				}
				break;

			default:
				console.log("Nieznana akcja:", changes);
				break;
		}
	};
	const deleteEventFromFirestore = async (id: string): Promise<void> => {
		try {
			const dataRef = doc(db, "appointments", id);
			await deleteDoc(dataRef);
			console.log(`Wydarzenie z id ${id} zostało usunięte.`);
			fetchEvents();
		} catch (error) {
			console.error("Błąd podczas usuwania wydarzenia: ", error);
		}
	};

	const addDataToFirestore = async (data: Data): Promise<void> => {
		try {
			const appoimentsCollection = collection(db, "appointments");
			await addDoc(appoimentsCollection, data);
			console.log("Nowe wydarzenie zostało dodane", data);
			fetchEvents();
		} catch (error) {
			console.error("Błąd podczas dodawania wydarzenia: ", error);
		}
	};
	const updateEventInFirestore = async (data: Data): Promise<void> => {
		try {
			const dataRef = doc(db, "appointments", data.id);
			console.log(data.id);
			console.log(data);
			await updateDoc(dataRef, { ...data });
			console.log("wydarzenie zostal zaktualizowane");
			fetchEvents();
		} catch (error) {
			console.log("Blad wydarzenia ", error);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		if (data.length > 0) {
			dataDecoder(data);
		}
	}, [data]);

	const dataDecoder = (data: AppointmentData[]) => {
		const converted = data.map(({ id, title, startDate, endDate, notes }) => ({
			id,
			title,
			startDate: startDate.toDate(),
			endDate: endDate.toDate(),
			notes,
		}));

		setConvertedData(converted);
	};

	return (
		<>
			<Scheduler locale={"pl-PL"} height={600} data={convertedData}>
				<ViewState defaultCurrentDate={today} defaultCurrentViewName="Week" />
				<EditingState onCommitChanges={handleSchedulerChange} />
				<IntegratedEditing />
				<DayView startDayHour={8} endDayHour={18} displayName="Dzień" />
				<WeekView startDayHour={9} endDayHour={19} displayName="Tydzień" />
				<MonthView displayName="Miesiąc" />
				<Toolbar />
				<DateNavigator />
				<TodayButton />
				<ViewSwitcher />
				<Appointments />
				<AppointmentTooltip
					showCloseButton={true}
					showDeleteButton={true}
					showOpenButton={true}
				/>
				<AppointmentForm />
			</Scheduler>
		</>
	);
};
