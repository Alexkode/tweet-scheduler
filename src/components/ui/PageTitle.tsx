interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default PageTitle;