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
import { Appointment } from "../../Types/types";

interface ViewComponentProps {
	convertedData: Appointment[];
	handleSchedulerChange: (changes: any) => void;
}

export const ViewComponent: React.FC<ViewComponentProps> = ({
	convertedData,
	handleSchedulerChange,
}) => {
	const today = new Date();
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
				<AppointmentTooltip showCloseButton showDeleteButton showOpenButton />
				<AppointmentForm />
			</Scheduler>
		</>
	);
};
