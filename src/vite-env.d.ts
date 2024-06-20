/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_BASE_API: string;
	readonly VITE_UPLOAD_API: string;
	readonly VITE_MOCK: string;
	readonly VITE_MOCK_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
declare const __MY_APP_VERSION__: string
