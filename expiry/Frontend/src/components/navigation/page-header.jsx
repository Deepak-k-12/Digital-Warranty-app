import PageBreadcrumb from './page-breadcrumb';
import ThemeToggle from '@/components/theme-toggle';

const PageHeader = ({ items, heading, children }) => {
  // Set document title based on heading or breadcrumb
  document.title =
    (items?.length > 1 && items[items.length - 1]?.label) || heading;

  return (
    <>
      <PageBreadcrumb items={items} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left: Heading */}
        <div className="flex items-center gap-2">
          <h1 className="heading text-4xl leading-tight !font-bold tracking-tight sm:text-3xl sm:leading-14">
            {heading}
          </h1>
        </div>

        {/* Right: Action buttons + Theme toggle */}
        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
          {children}
          {/* Theme toggle button */}
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default PageHeader;
