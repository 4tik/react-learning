export default async function CommentDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const comments = [
        { id: 1, text: "Great blog!" },
        { id: 2, text: "Very helpful 👍" },
        { id: 3, text: "Thanks for sharing" },
    ];

    return (
        <div className="text-3xl font-bold mt-4">
            <h1>Comments of Blog ID: {id}</h1>

            <ul className="mt-4 space-y-2">
                {comments.map((comment) => (
                    <li key={comment.id} className="border p-2 rounded">
                        {comment.id}. {comment.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}