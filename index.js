const { error } = require('console');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/calculate', (req, res) => {
    const {num1, num2, operation } = req.query

    // Validate inputs
    if (!num1 || !num2 || !operation) {
        return res.status(400).json({ error: 'Missing parameters. Please provide parameters in the next order: num1, num2, operation.'})
    };

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid numbers provided.' })
    };

    let status;

    // Perform the requested operation
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'substract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 == 0) {
                return res.status(400).json({error: 'Cannot divide by zero.'});
            }
            result = number1 / number2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation. Use "add", "substract", "multiply" or "divide".' });
    };

    // Return result as a JSON object
    res.json(
        {num1: number1, num2: number2, operation: result}
    );

});


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});