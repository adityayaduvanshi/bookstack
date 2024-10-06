import React from "react";
import Image from "next/image";
import { templates } from "@/data/template";

interface TemplateComponentProps {
  templateId: string;
}

const TemplateComponent: React.FC<TemplateComponentProps> = ({
  templateId,
}) => {
  const template = templates.find((t) => t.id === templateId);

  if (!template) {
    return <div>Template not found</div>;
  }

  if (template.type === "image" && template.imagePath) {
    return (
      <div>
        <Image
        className="object-contain"
          src={template.imagePath}
          alt={template.name}
          width={500}
          height={600}
        />
      </div>
    );
  }

  if (template.type === "html") {
    return <div dangerouslySetInnerHTML={{ __html: template.content }} />;
  }

  return <div>Invalid template type</div>;
};

export default TemplateComponent;
