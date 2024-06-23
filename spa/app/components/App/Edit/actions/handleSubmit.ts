import { useNavigate } from '@remix-run/react';
import App from '~/model/App/App';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';
import AppRepository from '~/repository/App';

export default async function handleSubmit(app: NewApp | App) {
	const navigate = useNavigate();
	if (app instanceof NewApp) {
		if (!confirm(`アプリを作成しますか？`)) { return; }
		const repo = new AppRepository();
		const res = await repo.createWithView(
			new NewApp(app),
			new NewView({
				code:"",
				app_code: app.code,
				name: "default",
				description: "default",
				list: {
					content: []
				},
				detail: {
					content: []
				}
			})
		);
		navigate(`/app/${res.code}`);
	} else if (app instanceof App) {
		if (!confirm(`アプリを更新しますか？`)) { return; }
		const appRepo = new AppRepository();
		const res = await appRepo.update(app);
		navigate(`/app/${res.code}`);
	}

}