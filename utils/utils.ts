

export async function sleep(milliseconds) {
    return new Promise((res) => setTimeout(res, milliseconds))
}