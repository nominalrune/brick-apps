export default function getHandleAppChange(updateApp: (name: "name"|"description"|"icon"|'code', value: any) => void) {
	return (name: string, value: string) => {
		if (name !== "name" && name !== "description" && name !== "icon" && name !== 'code') return;
		updateApp(name, value);
	};
}
