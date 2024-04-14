const Json = {
    ...JSON,
    parse: (data: string) => {
        if(data==="") return {};
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    },
};
