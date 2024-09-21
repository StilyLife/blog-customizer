import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import { ArrowButton } from 'components/arrow-button';
import { Separator } from '../separator';
import { Select } from '../select';
import { Button } from 'components/button';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import clsx from 'clsx';

interface ArticleParamsFormProps {
	onApplyParams: (paramsText: typeof defaultArticleState) => void;
	onResetParams: () => void;
	fontFamilyOptions: OptionType[];
	fontSizeOptions: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidthArr: OptionType[];
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApplyParams,
	onResetParams,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
}) => {
	const [params, setParams] =
		useState<typeof defaultArticleState>(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const onChangeHandler =
		(key: keyof typeof defaultArticleState) => (selectedOption: OptionType) => {
			setParams((prevParams) => ({
				...prevParams,
				[key]: selectedOption,
			}));
		};

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onApplyParams(params);
		setIsMenuOpen(false);
	};

	const onResetHandler = () => {
		setParams(defaultArticleState);
		onResetParams();
		setIsMenuOpen(false);
	};

	useEffect(() => {
		const closeHandler = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', closeHandler);
		}

		return () => {
			document.removeEventListener('mousedown', closeHandler);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isVisible={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onSubmitHandler} ref={formRef}>
					<Text size={31} weight={800} uppercase={true} as="h2">
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChangeHandler('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={onChangeHandler('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={params.fontColor}
						options={fontColors}
						onChange={onChangeHandler('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={onChangeHandler('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={onChangeHandler('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onResetHandler} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

export default ArticleParamsForm;