const validateRequest = (req, schema) => {
    const validationSchema = schema.body;

    const { error, value } = validationSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    req.body = value;
};

module.exports = validateRequest;