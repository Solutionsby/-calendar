import { db } from "../utilities/firebaseConfig";
import { Dispatch, SetStateAction } from "react";
import { Appointment, AppointmentData } from "../../Types/types";
import {
	collection,
	deleteDoc,
	updateDoc,
	doc,
	addDoc,
	getDocs,
} from "firebase/firestore";

export const fetchAppointments = async (
	setter: Dispatch<SetStateAction<AppointmentData[]>>
) => {
	try {
		const querySnapshot = await getDocs(collection(db, "appointments"));
		const fetchedEvents: AppointmentData[] = [];
		querySnapshot.forEach((doc) => {
			fetchedEvents.push({ id: doc.id, ...doc.data() } as AppointmentData);
		});
		setter(fetchedEvents);
	} catch (error) {
		console.error("Error fetching events: ", error);
	}
};

export const addDataToFirestore = async (
	data: Appointment,
	setter: Dispatch<SetStateAction<AppointmentData[]>>
): Promise<void> => {
	try {
		const appointmentsCollection = collection(db, "appointments");
		await addDoc(appointmentsCollection, data);
		console.log("Nowe wydarzenie zostało dodane", data);
		fetchAppointments(setter);
	} catch (error) {
		console.error("Błąd podczas dodawania wydarzenia: ", error);
	}
};

export const deleteEventFromFirestore = async (
	id: string,
	setter: Dispatch<SetStateAction<AppointmentData[]>>
): Promise<void> => {
	try {
		const dataRef = doc(db, "appointments", id);
		console.log(id);
		await deleteDoc(dataRef);
		console.log(`Wydarzenie z id ${id} zostało usunięte.`);
		fetchAppointments(setter);
	} catch (error) {
		console.error("Błąd podczas usuwania wydarzenia: ", error);
	}
};

export const updateEventInFirestore = async (
	data: Appointment,
	setter: Dispatch<SetStateAction<AppointmentData[]>>
): Promise<void> => {
	try {
		const dataRef = doc(db, "appointments", data.id);
		await updateDoc(dataRef, { ...data });
		console.log("Wydarzenie zostało zaktualizowane", data);
		fetchAppointments(setter);
	} catch (error) {
		console.error("Błąd podczas aktualizacji wydarzenia: ", error);
	}
};
