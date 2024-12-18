# Pluralsight's Unit Testing in Angular Course

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Revised Notes on Angular Unit Testing

### **Automated Testing**

- **Types of Testing**:
  1. **Unit Testing**: Focuses on testing individual units (e.g., functions, services, components) in isolation.
  2. **End-to-End (E2E) Testing**: Tests the entire application workflow from the user's perspective.
  3. **Integration/Functional Testing**: Validates how components, modules, or services work together.

### **Key Concepts**

- **What is a Unit Test**:A test that validates a small, isolated part of the application to ensure it behaves as expected.
- **Mocking**:The process of creating fake implementations of dependencies (e.g., services, APIs) to isolate the unit being tested.
- **Tools**:
  - **Karma**: A test runner for Angular applications.
  - **Jasmine**: A testing framework commonly used with Karma.
  - **Jest**: An alternative testing framework with better performance and built-in mocking capabilities.
  - **Web Test Runner**: A modern alternative for running browser-based tests.

---

### **Types of Unit Testing in Angular**

1. **Isolated Unit Tests**:
   - Tests a class, function, or service without Angular-specific dependencies.
   - Dependencies are mocked using tools like `createSpyObj`.
2. **Integration Tests**:
   - Test components or services with their dependencies, but the depth varies:
     - **Shallow Integration Tests**:
       - Test a component and its template with mocked child components or directives.
       - Uses `TestBed`, `fixture`, and `DebugElement`.
     - **Deep Integration Tests**:
       - Test a component with real child components and services instead of mocked ones.
       - Often involves using the `HttpTestingController` for service calls.
3. **Functional Tests**:

   Sometimes used interchangeably with "integration tests," these ensure multiple parts work together as expected.

---

### **Writing a Good Unit Test**

- Follow the **AAA Pattern**:
  1. **Arrange**: Set up necessary conditions, inputs, and mock dependencies.
  2. **Act**: Execute the code under test.
  3. **Assert**: Verify that the outcomes match expectations.
- **DAMP vs DRY**:
  - While DRY (Don't Repeat Yourself) applies to production code, testing can favor **DAMP (Descriptive and Meaningful Phrases)** over strict DRYness.
  - Repeating code in tests is acceptable if it improves readability and tells a clear "story."

---

### **Module Two - Detailed Breakdown**

### **Isolated Unit Tests**

- **What They Are**:Tests that run without Angular’s `TestBed`, focusing solely on logic in services, pipes, or functions.
- **Mocking Services**:
  - Use `createSpyObj` to mock dependencies.Example: `const mockService = jasmine.createSpyObj('ServiceName', ['methodName']);`

### **Shallow Integration Tests**

- **What They Are**:Test a component along with its template but replace child components, directives, or pipes with mocks or stubs.
- **Key Elements**:
  - **TestBed**: Configures and initializes the testing environment.
  - **Fixture**: Represents a wrapper for the component under test.
  - **DebugElement**: Provides an API to query and interact with the DOM.
  - **Child Directives**: Mocks child components to isolate the parent component under test.

### **Deep Integration Tests**

- **What They Are**:Similar to shallow tests but include real child components, services, and modules.
- **Service Integration Tests**:
  - Test services with HTTP calls using the `HttpTestingController` from `@angular/common/http/testing`.

### **Testing DOM Interactions**

- **Event Testing**:
  - Simulate user actions by triggering DOM events using methods like `dispatchEvent`.
  - Example: `buttonElement.triggerEventHandler('click', null);`
- **Emitting from Child Components**:
  - Mock child components and verify emitted events using spies.
- **Testing Input Elements**:
  - Simulate user input by setting values on form controls and triggering events like `input`.

### **Router Testing**:

- Test components with `RouterLink` directives to verify correct routing behavior.

---

### **Async Testing**

- **FakeAsync**:
  - Use for synchronous testing of asynchronous code.
  - Provides control over timers with `tick()` and `flush()`.
- **Async**:
  - Allows testing of asynchronous code using `async()` wrapper and `whenStable()` to ensure stability.

---

### **Code Coverage**

- Measures the percentage of code executed by tests.
- Tools like Karma and Jest provide detailed coverage reports to identify untested parts of the codebase.

---

## Thoughts

- Isolated should be the default as it’s more robust
- Integration should be used when neded
- Deep integration test should be rarely used
