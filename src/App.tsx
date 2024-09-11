import "./App.css";
import { AppProvider } from "./components/Context.tsx/appContext";
import { SchelduerComponent } from "./components/schelduer/Schelduer";

function App() {
	return (
		<>
			<AppProvider>
				<SchelduerComponent />
			</AppProvider>
		</>
	);
}

export default App;
