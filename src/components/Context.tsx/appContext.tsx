import React, {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { AppointmentData, Appointment } from "../../Types/types";
import { useEffect } from "react";

interface AppContextType {
	convertedData: Appointment[];
	setAppointments: Dispatch<SetStateAction<AppointmentData[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [appointments, setAppointments] = useState<AppointmentData[]>([]);
	const [convertedData, setConvertedData] = useState<Appointment[]>([]);

	useEffect(() => {
		if (appointments.length >= 0) {
			dataDecoder(appointments);
		}
	}, [appointments]);

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
		<AppContext.Provider value={{ setAppointments, convertedData }}>
			{children}
		</AppContext.Provider>
	);
};
