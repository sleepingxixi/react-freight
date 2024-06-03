import { Button, Form, FormInstance } from 'antd';

const SearchForm = (props: {
	form: FormInstance<any> | undefined;
	submit?: () => void;
	reset?: () => void;
	initialValues?: any;
	children?: React.ReactNode;
}) => {
	return (
		<div className='page-search-form'>
			<Form layout='inline' form={props.form} initialValues={props.initialValues}>
				{props.children}
				<Form.Item>
					<Button
						key='confirm'
						type='primary'
						onClick={() => {
							props?.submit && props?.submit();
						}}
					>
						搜索
					</Button>
					<Button
						key='reset'
						onClick={() => {
							props?.reset && props?.reset();
						}}
					>
						重置
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
export default SearchForm;
