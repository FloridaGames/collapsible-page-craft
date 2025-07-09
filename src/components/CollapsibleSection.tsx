import { useState } from 'react';
import { ChevronDown, Copy, Trash2 } from 'lucide-react';
import { EditableText } from './EditableText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SectionData {
  id: string;
  title: string;
  content: string;
}

interface CollapsibleSectionProps {
  section: SectionData;
  onUpdate: (section: SectionData) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const CollapsibleSection = ({
  section,
  onUpdate,
  onDuplicate,
  onDelete,
  isSelected,
  onSelect,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleChange = (title: string) => {
    onUpdate({ ...section, title });
  };

  const handleContentChange = (content: string) => {
    onUpdate({ ...section, content });
  };

  return (
    <div 
      className={cn(
        "border border-border rounded-lg mb-3 transition-all duration-200",
        isSelected && "ring-2 ring-primary shadow-md"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target instanceof HTMLElement && e.target.closest('.section-header')) {
          onSelect(section.id);
        }
      }}
    >
      <div className="section-header">
        <details 
          open={isOpen} 
          onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
          className="group"
        >
          <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )} 
              />
              <div className="flex-1 min-w-0">
                <EditableText
                  value={section.title}
                  onChange={handleTitleChange}
                  className="font-semibold text-sm"
                  placeholder="Enter section title..."
                />
              </div>
            </div>
            
            {isSelected && (
              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(section.id);
                  }}
                  className="h-7 w-7 p-0 hover:bg-primary/10"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(section.id);
                  }}
                  className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </summary>
          
          <div className="px-4 pb-4">
            <div className="pl-7">
              <EditableText
                value={section.content}
                onChange={handleContentChange}
                className="text-sm text-muted-foreground leading-relaxed"
                placeholder="Enter section content..."
                multiline
              />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};