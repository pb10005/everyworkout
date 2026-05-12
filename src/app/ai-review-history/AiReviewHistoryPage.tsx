"use client";

import { SparklesIcon } from "@heroicons/react/20/solid";
import { ListContainer, Loading, MarkdownContent, Subheader } from "../../components";
import { api } from "../../utils/api";

export const AiReviewHistoryPage: React.FC = () => {
    const { data: aiSettings } = api.userSettings.get.useQuery();
    const { data: reviews, isLoading } = api.ai.getUserAiReviews.useQuery(
        undefined,
        { enabled: aiSettings?.aiEnabled === true }
    );

    return (
        <>
            <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-purple-400" />
                <Subheader content="AIコーチからのレビュー履歴" variant="section" />
            </div>
            <p className="text-xs text-purple-400 mb-4">AI生成（毎週月曜更新）</p>
            {isLoading && <Loading />}
            {!isLoading && reviews && reviews.length > 0 && (
                <ListContainer>
                    {reviews.map(r => (
                        <li key={r.id} className="py-2 px-4">
                            <Subheader content={r.executeDate} variant="subsection" />
                            <MarkdownContent content={r.content} />
                        </li>
                    ))}
                </ListContainer>
            )}
            {!isLoading && (!reviews || reviews.length === 0) && (
                <div className="flex flex-col items-center gap-2 py-8 px-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-dashed border-purple-200 dark:border-purple-700">
                    <SparklesIcon className="w-10 h-10 text-purple-300 dark:text-purple-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        まだレビューがありません
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                        トレーニングを記録すると、毎週月曜日にAIコーチからフィードバックが届きます
                    </p>
                </div>
            )}
        </>
    );
};
