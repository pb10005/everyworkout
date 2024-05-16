type Props = {
    content: string;
};

export const Subheader:React.FC<Props> = (props: Props) => {
    const { content } = props;

    return (
        <>
            <div className="text-sm text-gray-700 dark:text-gray-300 my-2">{content}</div>
        </>
    );
};
