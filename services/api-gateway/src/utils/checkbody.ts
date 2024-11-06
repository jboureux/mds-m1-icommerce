function checkBody(body: Record<string, unknown>, keys: string[]): boolean {
    let isValid = true;
    const regex = /^\s*$/;

    for (const field of keys) {
        if (!body[field] || body[field] === "" || regex.test(body[field] as string)) {
            isValid = false;
        }
    }

    return isValid;
}

export default checkBody;

