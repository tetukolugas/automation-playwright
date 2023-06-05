# automation-playwright

This repository contains an automation framework built using Playwright, an open-source library for browser automation. This framework allows you to write automated tests and perform browser actions using JavaScript.

## Features

- Cross-browser support: Playwright supports multiple browsers including Chrome, Firefox, and Safari, allowing you to test your web applications on different browsers.
- Headless and non-headless mode: You can run tests in headless mode for faster execution or in non-headless mode to visually observe the browser actions.
- Page objects: The framework encourages the use of page objects, enabling you to write more maintainable and reusable tests.
- Powerful API: Playwright provides a powerful API that allows you to interact with web elements, perform actions like clicking, typing, or hovering, and retrieve information from the page.
- Network interception: You can intercept network requests and responses, allowing you to simulate different network conditions and handle AJAX requests in your tests.
- Parallel execution: Playwright supports parallel test execution, making it faster to run a large suite of tests.

## Getting Started

To use this framework, follow these steps:

1. **Clone as Template**: Click the "Use this template" button at the top of the repository to create a new repository based on this framework. Alternatively, you can clone the repository manually:

   ```bash
   git clone git@github.com:tetukolugas/automation-playwright.git
   cd automation-playwright
   ```

2. Copy environment variables:

   ```bash
   cp sample.env .env
   ```

3. Install dependencies:

   ```bash
   npm install
   npx playwright install-deps
   npx playwright install
   ```

4. Configure the desired configuration in the test configuration file (`playwright.config.js`) by specifying the browser type and options.

5. Run the tests:

   ```bash
   # Run UI Web Automation
   npx playwright test web

   # API
   npx playwright test api
   ```

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

Please ensure that your code follows the existing coding style and includes appropriate tests. Also, update the documentation and README.md file as necessary.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code according to your needs.
