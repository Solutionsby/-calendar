import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utilities/firebaseConfig";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	DayView,
	WeekView,
	MonthView,
	Toolbar,
	ViewSwitcher,
	Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import firebase from "firebase/compat/app";

interface AppointmentData {
	id: string;
	title: string;
	startDate: firebase.firestore.Timestamp;
	endDate: firebase.firestore.Timestamp;
}

interface ConvertedAppointment {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
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

	useEffect(() => {
		fetchEvents();
	}, []);
	useEffect(() => {
		if (data.length > 0) {
			dataDecoder(data);
		}
	}, [data]);

	const dataDecoder = (data: AppointmentData[]) => {
		const converted = data.map(({ id, title, startDate, endDate }) => ({
			id,
			title,
			startDate: startDate.toDate(),
			endDate: endDate.toDate(),
		}));

		setConvertedData(converted);
	};
	return (
		<>
			<Scheduler locale={"pl-PL"} height={600} data={convertedData}>
				<ViewState defaultCurrentDate={today} defaultCurrentViewName="Week" />
				<DayView startDayHour={8} endDayHour={18} displayName="Dzień" />
				<WeekView startDayHour={9} endDayHour={19} displayName="Tydzień" />
				<MonthView displayName="Miesiąc" />
				<Toolbar />
				<ViewSwitcher />
				<Appointments />
			</Scheduler>
		</>
	);
};
