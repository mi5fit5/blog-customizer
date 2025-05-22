import { useEffect } from 'react';

// Кастомный хук для закрытия сайдбара
export function useSidebarAutoClose(
	rootRef: React.RefObject<HTMLDivElement>,
	onClickOutside: () => void,
	isOpen: boolean
) {
	useEffect(() => {
		if (!isOpen) return;

		// Обработчик нажатия Escape
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClickOutside();
			}
		};

		// Обработчик клика вне сайдбара
		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClickOutside();
			}
		};

		// Добавление обработчиков событий при монитровании
		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		// Очистка обработчиков при размонтировании
		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClickOutside]);
}
