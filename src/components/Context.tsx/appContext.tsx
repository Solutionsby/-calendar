import React, { createContext, useState, useEffect, ReactNode } from "react";
import { fetchAppointments } from "../utilities/firebaseService";

interface AppointmentData {
	id: string;
	title: string;
	startDate: Date;
	endDate: Date;
	location: string;
}

interface AppContextType {
	appointments: AppointmentData[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [appointments, setAppointments] = useState<AppointmentData[]>([]);

	useEffect(() => {
		const loadAppointments = async () => {
			const dataApoimnts = await fetchAppointments();
			setAppointments(dataApoimnts);
		};

		loadAppointments();
	}, [appointments]);

	return (
		<AppContext.Provider value={{ appointments }}>
			{children}
		</AppContext.Provider>
	);
};
