// convert each word into capitalized case
const handleTitleCase = (val) => {
    if (!val) return "";
    return val
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default handleTitleCase;