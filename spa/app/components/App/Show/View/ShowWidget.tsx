import Widget from '~/model/App/View/Widget';

export default function ShowWidget({ widget, record }: { widget:Widget, record: any; }) {
	return <div className='flex flex-col gap-2' >
		{widget.label}
		<div className='ml-1 flex gap-1 items-baseline'>
			{widget.prefix}
			<div className='p-2 border border-slate-300 bg-slate-400/10'>
				{record[widget.code]?.toString()}
			</div>
			{widget.suffix}
		</div>
	</div>;
}