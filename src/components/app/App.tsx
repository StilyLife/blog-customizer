import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [paramsText, setParamsText] = useState(defaultArticleState);

	const applyParamsHandler = (newParamsText: typeof defaultArticleState) => {
		setParamsText(newParamsText);
	};

	const resetParamsHandler = () => {
		setParamsText(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': paramsText.fontFamilyOption.value,
					'--font-size': paramsText.fontSizeOption.value,
					'--font-color': paramsText.fontColor.value,
					'--container-width': paramsText.contentWidth.value,
					'--bg-color': paramsText.backgroundColor.value,
				} as CSSProperties
			}>
			<main className={styles.content}>
				<ArticleParamsForm
					onApplyParams={applyParamsHandler}
					onResetParams={resetParamsHandler}
					fontFamilyOptions={fontFamilyOptions}
					fontSizeOptions={fontSizeOptions}
					fontColors={fontColors}
					backgroundColors={backgroundColors}
					contentWidthArr={contentWidthArr}
				/>
				<Article />
			</main>
		</div>
	);
};