import React from 'react';
import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-600">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-blue-600 hover:text-blue-800">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;