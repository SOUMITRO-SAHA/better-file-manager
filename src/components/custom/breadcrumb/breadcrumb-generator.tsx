import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pathChange } from "@/lib/utils/common";
import { HouseIcon } from "lucide-react";
import * as React from "react";

interface BreadCrumbGeneratorProps {
  path: string;
}

type PathSegment = {
  name: string;
  href: string;
};

const defaultHomeDirectory: Readonly<PathSegment> = {
  name: "Home",
  href: "/",
};

const BreadCrumbGenerator: React.FC<BreadCrumbGeneratorProps> = (props) => {
  const { path } = props;

  const pathSegments: PathSegment[] =
    path
      .split("/")
      .filter((segment) => segment !== "")
      .map((segment, index, array) => {
        const href = "/" + array.slice(0, index + 1).join("/");
        return { name: segment, href };
      }) || [];

  if (pathSegments.length === 0) {
    pathSegments.push(defaultHomeDirectory);
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={`${segment.href} ${index}`}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem key={index}>
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage className={cn("cursor-default")}>
                  {segment.href === "/" ? (
                    <HouseIcon className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    segment.name
                  )}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "cursor-pointer",
                    }),
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    pathChange({
                      destinationPath: segment.href,
                    });
                  }}
                >
                  {segment.name}
                </BreadcrumbItem>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbGenerator;
