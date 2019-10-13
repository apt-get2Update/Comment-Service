export function load() {
    const env: String = (process.env.NODE_ENV || "dev").toLowerCase();
    console.log(__dirname);
    return {
        env,
        ...require(`./${env}.json`)
    };
}