export default function Product({
    params,
} : {
    params: { testid: string };
}) {
    return <h1>details about p {params.testid}</h1>
}