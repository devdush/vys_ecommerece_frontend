
export const setBrandsByCategorizedProducts = (brands) => {
    console.log("params",brands)
    return {
        type:"BRANDS",
        brands : brands
    };
};
