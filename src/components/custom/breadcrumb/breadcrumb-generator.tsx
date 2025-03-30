import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import * as React from "react";

interface BreadCrumbGeneratorProps {
  path: string;
}

const BreadCrumbGenerator: React.FC<BreadCrumbGeneratorProps> = (props) => {
  const { path } = props;

  const pathSegments = path
    .split("/")
    .filter((segment) => segment !== "")
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      return { name: segment, href };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={`${segment.href} ${index}`}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={index}>
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage>{segment.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={segment.href}>
                  {segment.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbGenerator;
