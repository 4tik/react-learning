export default async function BlogDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return (
        <div className="text-center mt-5">
            <h1>Blog ID: {id}</h1>
        </div>
    );
}