import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utilities/firebaseConfig";

export const Schelduer = () => {
	const [events, setEvents] = useState([]);

	// Funkcja do pobierania danych z Firestore
	const fetchEvents = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "appointments")); // Pobiera kolekcję 'events'
			const fetchedEvents = [];
			querySnapshot.forEach((doc) => {
				fetchedEvents.push({ id: doc.id, ...doc.data() }); // Dodaje dokumenty do tablicy
			});
			setEvents(fetchedEvents); // Ustawia pobrane wydarzenia w stanie
		} catch (error) {
			console.error("Error fetching events: ", error);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);
	console.log(events);
};
