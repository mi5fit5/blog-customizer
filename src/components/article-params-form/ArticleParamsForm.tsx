import { useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useSidebarAutoClose } from './hooks/useSidebarAutoClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';

// Тип пропсов для компонента
type ArticleParamsFormType = {
	title: string;
	params: ArticleStateType;
	setParams: (params: ArticleStateType) => void; // Функция для обновления параметров в родителе
};

// Компонент формы
export const ArticleParamsForm = ({
	title,
	params,
	setParams,
}: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(params);

	// Кастомный хук для закрытия сайдбара при клике вне его
	useSidebarAutoClose(sidebarRef, () => {
		if (isOpen) setIsOpen(false);
	});

	// Обработчик отправки формы
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setParams(formState);
		setIsOpen(false);
	};

	// Обработчик сброса формы
	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(defaultArticleState);
		setParams(defaultArticleState);
	};

	// Функция для обновления локального состояния формы
	const handleChange = (key: keyof ArticleStateType, option: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: option }));
	};

	// Функция переключения видимости сайдбара по нажатию кнопки
	const handleToggle = () => setIsOpen((prev) => !prev);

	// Рендер элементов формы
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						{title}
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
