# Component Documentation & JSDoc Standards

This guide outlines the standard JSDoc format and documentation practices for the MH Construction codebase.

---

## JSDoc Format Standard

All components, functions, and utilities must include JSDoc comments following this pattern:

### Basic Component JSDoc

```typescript
/**
 * ComponentName Component
 *
 * Brief one-line description of what the component does.
 * Add more context if needed across multiple sentences.
 * Explain the primary use case and main features.
 *
 * @component
 * @example
 * // Basic usage
 * <ComponentName prop1="value" prop2={true} />
 *
 * @example
 * // Advanced usage with children
 * <ComponentName variant="primary">
 *   Child content here
 * </ComponentName>
 *
 * @param {ComponentNameProps} props - The component props
 * @param {string} props.title - The main title text
 * @param {ReactNode} props.children - Child elements to render
 * @param {boolean} [props.isOpen=false] - Whether component is open (optional)
 * @param {() => void} props.onClose - Callback when closed
 * @returns {React.ReactElement} The rendered component
 *
 * @see [Related Component](./RelatedComponent.tsx)
 * @since v1.0.0
 */
export function ComponentName({
  title,
  children,
  isOpen = false,
  onClose,
}: ComponentNameProps) {
  // Implementation
}
```

### Function JSDoc

```typescript
/**
 * Utility function that processes data and returns result
 *
 * Provides detailed explanation of what the function does,
 * any side effects, and important notes about behavior.
 *
 * @example
 * const result = processData({ id: 1, name: "Input" });
 * console.log(result); // "Processed: Input"
 *
 * @param {ProcessDataInput} input - The input data object
 * @param {number} input.id - Unique identifier
 * @param {string} input.name - Display name
 * @returns {string} The processed result string
 * @throws {TypeError} If input.id is not a number
 *
 * @since v2.0.0
 */
export function processData(input: ProcessDataInput): string {
  // Implementation
}
```

### Custom Hook JSDoc

```typescript
/**
 * useFormState Hook
 *
 * Manages form state with error handling and validation support.
 * Automatically handles form field changes and error tracking.
 *
 * @example
 * const { state, setField, errors, validate } = useFormState(initialData);
 *
 * @template T - The shape of the form data
 * @param {T} initialState - Initial form state
 * @param {ValidationSchema<T>} [schema] - Optional validation schema
 * @returns {FormStateReturn<T>} Form state and handlers
 * @returns {T} state - Current form data
 * @returns {(field: keyof T, value: any) => void} setField - Update a field
 * @returns {Record<keyof T, string>} errors - Field error messages
 * @returns {() => Promise<boolean>} validate - Validate form data
 *
 * @since v1.0.0
 */
export function useFormState<T>(
  initialState: T,
  schema?: ValidationSchema<T>,
): FormStateReturn<T> {
  // Implementation
}
```

---

## Interface/Type Documentation

```typescript
/**
 * Props for ComponentName component
 *
 * @interface ComponentNameProps
 * @property {string} title - The main heading text
 * @property {ReactNode} [children] - Optional child elements
 * @property {string} [className] - Additional CSS classes
 * @property {() => void} [onClose] - Callback when component closes
 * @property {"primary" | "secondary"} [variant="primary"] - Visual style variant
 */
export interface ComponentNameProps {
  title: string;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
  variant?: "primary" | "secondary";
}
```

---

## Documentation Requirements by File Type

### React Components (`*.tsx`)

**Required Elements:**

- Component description
- Usage examples (at least 1, up to 3)
- Props documentation (all props with types)
- Return type
- Version introduced

**Optional Elements:**

- @see links to related components
- @deprecated tags for old components
- Custom @throws documentation

### Utility Functions (`*.ts`)

**Required Elements:**

- Function description
- Parameter documentation (with types)
- Return value documentation
- Usage example

**Optional Elements:**

- @throws for error conditions
- Performance notes
- Browser compatibility info

### Custom Hooks (`*.ts`)

**Required Elements:**

- Hook name with "use" prefix
- Clear description of state managed
- Parameters (state shape, options)
- Returns (all state and handlers)
- Usage example
- Generic type parameters documented

---

## JSDoc Tag Reference

### Common Tags

| Tag                   | Purpose                 | Example                                |
| --------------------- | ----------------------- | -------------------------------------- |
| `@component`          | React component marker  | `@component`                           |
| `@example`            | Usage example           | `@example`                             |
| `@param {type} name`  | Parameter documentation | `@param {string} title`                |
| `@returns {type}`     | Return value            | `@returns {boolean}`                   |
| `@throws {ErrorType}` | Error conditions        | `@throws {Error}`                      |
| `@deprecated`         | Mark as deprecated      | `@deprecated Use NewComponent instead` |
| `@see`                | Related item link       | `@see [Link Text](./file.tsx)`         |
| `@since`              | Version introduced      | `@since v1.0.0`                        |
| `@template T`         | Generic type param      | `@template T - Generic type`           |
| `@internal`           | Internal/private API    | `@internal`                            |
| `@readonly`           | Read-only property      | `@readonly`                            |
| `@async`              | Async function          | `@async`                               |

### Type Annotations

```typescript
@param {string} name                    // Primitive types
@param {string[]} names                 // Array of primitives
@param {Object} config                  // Object
@param {Object} config.title            // Nested properties
@param {function} callback              // Function
@param {(value: string) => void} onChange // Function with signature
@param {Promise<string>} promise        // Promise
@returns {React.ReactElement}           // React element
@returns {JSX.Element}                  // JSX element
```

---

## Complex Component Example

```typescript
import React, { memo, useCallback, ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * DataTable Component
 *
 * Renders a sortable, paginated data table with filtering capabilities.
 * Supports custom cell rendering, row selection, and responsive design.
 * Automatically handles loading states and empty data scenarios.
 *
 * Features:
 * - Sortable columns with visual indicators
 * - Pagination with configurable page size
 * - Row selection (single or multi)
 * - Custom cell renderers per column
 * - Responsive mobile layout
 * - Accessibility features (ARIA labels, keyboard navigation)
 *
 * @component
 * @example
 * // Basic usage with default settings
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   onRowClick={(row) => console.log(row)}
 * />
 *
 * @example
 * // Advanced usage with customization
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   isLoading={isLoading}
 *   sortBy="name"
 *   pageSize={25}
 *   onSort={handleSort}
 *   renderCell={(column, value, row) => <CustomCell {...} />}
 *   onRowSelect={handleRowsSelected}
 *   selectable="multi"
 * />
 *
 * @param {DataTableProps<T>} props - The component props
 * @param {ColumnDef<T>[]} props.columns - Column definitions
 * @param {T[]} props.data - Row data array
 * @param {string} [props.sortBy] - Currently sorted column
 * @param {"asc" | "desc"} [props.sortOrder="asc"] - Sort direction
 * @param {(column: string, order: "asc" | "desc") => void} [props.onSort] - Sort handler
 * @param {number} [props.pageSize=10] - Rows per page
 * @param {number} [props.currentPage=1] - Current page number
 * @param {(page: number) => void} [props.onPageChange] - Page change handler
 * @param {"single" | "multi"} [props.selectable] - Selection mode
 * @param {string[]} [props.selectedRows] - Selected row IDs
 * @param {(rows: string[]) => void} [props.onRowSelect] - Row selection handler
 * @param {(row: T) => void} [props.onRowClick] - Row click handler
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {(column: ColumnDef<T>, value: any, row: T) => ReactNode} [props.renderCell] - Custom cell renderer
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.emptyMessage="No data available"] - Empty state message
 *
 * @returns {React.ReactElement} The rendered data table
 *
 * @throws {Error} If columns array is empty
 * @throws {Error} If data contains rows with missing keys
 *
 * @see [Column Configuration Guide](../guides/column-config.md)
 * @see [Row Selection Example](./DataTableExample.tsx)
 *
 * @since v1.2.0
 */
export const DataTable = memo(
  function DataTable<T extends Record<string, any>>({
    columns,
    data,
    sortBy,
    sortOrder = "asc",
    onSort,
    pageSize = 10,
    currentPage = 1,
    onPageChange,
    selectable,
    selectedRows = [],
    onRowSelect,
    onRowClick,
    isLoading = false,
    renderCell,
    className = "",
    emptyMessage = "No data available",
  }: DataTableProps<T>): React.ReactElement {
    // Implementation
    return <table className={className}>...</table>;
  },
  (prevProps, nextProps) => {
    // Custom equality check for memo
    return prevProps.data === nextProps.data && prevProps.isLoading === nextProps.isLoading;
  }
);

DataTable.displayName = "DataTable";

/**
 * Column definition for DataTable
 *
 * @template T - The row data type
 * @interface ColumnDef
 * @property {keyof T} key - Unique column identifier
 * @property {string} label - Display label
 * @property {number} [width] - Column width in pixels
 * @property {boolean} [sortable=true] - Whether column can be sorted
 * @property {(value: any) => string} [formatter] - Value formatter
 * @property {(a: any, b: any) => number} [compareFn] - Custom sort comparator
 */
export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  width?: number;
  sortable?: boolean;
  formatter?: (value: any) => string;
  compareFn?: (a: any, b: any) => number;
}

export default DataTable;
```

---

## Best Practices

### ✅ DO

- Write clear, concise descriptions
- Include practical examples (copy-paste ready)
- Document all public parameters
- Run JSDoc linter/validator
- Update JSDoc when API changes
- Use consistent formatting across files
- Include @example for complex components
- Document error conditions with @throws

### ❌ DON'T

- Copy-paste generic descriptions
- Leave out parameter types
- Omit @returns documentation
- Mix documentation styles
- Document implementation details
- Use abbreviations without clarity

---

## Auto-Documentation Generation

Generate HTML documentation from JSDoc:

```bash
npm install -g jsdoc
jsdoc -c jsdoc.json
```

Configuration (`jsdoc.json`):

```json
{
  "source": {
    "include": ["src"],
    "includePattern": ".+\\.tsx?$",
    "excludePattern": "(__tests__|node_modules)"
  },
  "output": "./docs/generated",
  "templates": "./node_modules/docdash"
}
```

---

## IDE Integration

### VS Code

Install JSDoc extensions:

- **JSDoc Generator** (kristianmandrup.jsdoc)
- **JSDoc Markdown Highlighting** (bierner.jsdoc-markdown)

Generate JSDoc snippet with keyboard shortcut or command palette.

### WebStorm/IntelliJ

JSDoc support built-in:

1. Type `/**` above function
2. Press `Enter`
3. Auto-generates template
4. Fill in parameters

---

## Checklist for Component Review

- [ ] Component has JSDoc header
- [ ] All props are documented with types
- [ ] Return type is documented
- [ ] At least one @example provided
- [ ] @param tags match actual parameters
- [ ] No typos in documentation
- [ ] Links are formatted correctly
- [ ] Version tag (@since) included
- [ ] Complex logic has inline comments
- [ ] Related components @see links added

---

## Related Documentation

- [Code Quality Standards](./standards/README.md)
- [Testing Guide](./testing-coverage-next-steps.md)
- [TypeScript Standards](./typescript-best-practices.md)

---

**Last Updated:** April 21, 2026  
**Maintained By:** MH Development Team
