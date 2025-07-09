import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CollapsibleSection, SectionData } from './CollapsibleSection';
import { EditableText } from './EditableText';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import starMarker from '@/assets/star-marker.png';

const initialSections: SectionData[] = [
  {
    id: '1',
    title: 'Relevante academische literatuur vinden',
    content: 'Deze vaardigheid is ook goed wat nu dan weer betekent dat je leert hoe je betrouwbare, academische literatuur vindt voor je onderzoek. Je gebruikt hiervoor databases, zoekstrategieën en slimme zoektechnieken. Zo vind je snel de juiste informatie bij je onderwerp.'
  },
  {
    id: '2',
    title: 'Academische literatuur kritisch lezen en verwerken',
    content: 'Deze vaardigheid betekent dat je leert hoe je betrouwbare, academische literatuur vindt voor je onderzoek. Je gebruikt hiervoor databases, zoekstrategieën en slimme zoektechnieken. Zo vind je snel de juiste informatie bij je onderwerp.'
  },
  {
    id: '3',
    title: 'Mediavaardigheden (geletterdheid)',
    content: 'Deze vaardigheid betekent dat je leert hoe je betrouwbare, academische literatuur vindt voor je onderzoek. Je gebruikt hiervoor databases, zoekstrategieën en slimme zoektechnieken. Zo vind je snel de juiste informatie bij je onderwerp.'
  },
  {
    id: '4',
    title: 'Kennishiaten in de literatuur identificeren',
    content: 'Deze vaardigheid betekent dat je leert hoe je betrouwbare, academische literatuur vindt voor je onderzoek. Je gebruikt hiervoor databases, zoekstrategieën en slimme zoektechnieken. Zo vind je snel de juiste informatie bij je onderwerp.'
  }
];

export const ContentEditor = () => {
  const [title, setTitle] = useState('Leervaardigheden');
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const { toast } = useToast();

  const generateNewId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSectionUpdate = (updatedSection: SectionData) => {
    setSections(sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    ));
  };

  const handleDuplicate = (id: string) => {
    const sectionToDuplicate = sections.find(section => section.id === id);
    if (sectionToDuplicate) {
      const newSection: SectionData = {
        ...sectionToDuplicate,
        id: generateNewId(),
        title: `${sectionToDuplicate.title} (Copy)`
      };
      
      const sectionIndex = sections.findIndex(section => section.id === id);
      const newSections = [...sections];
      newSections.splice(sectionIndex + 1, 0, newSection);
      
      setSections(newSections);
      setSelectedSectionId(newSection.id);
      
      toast({
        title: "Section duplicated",
        description: "The section has been successfully duplicated.",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (sections.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one section.",
        variant: "destructive"
      });
      return;
    }
    
    setSections(sections.filter(section => section.id !== id));
    if (selectedSectionId === id) {
      setSelectedSectionId(null);
    }
    
    toast({
      title: "Section deleted",
      description: "The section has been successfully removed.",
    });
  };

  const handleAddSection = () => {
    const newSection: SectionData = {
      id: generateNewId(),
      title: 'New Section',
      content: 'Enter your content here...'
    };
    
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
    
    toast({
      title: "Section added",
      description: "A new section has been created.",
    });
  };

  const handleSectionSelect = (id: string) => {
    setSelectedSectionId(selectedSectionId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-primary flex items-center justify-center w-16 h-16 rounded-lg mr-4">
            <img 
              src={starMarker} 
              alt="Learning Skills" 
              className="w-8 h-8 object-contain brightness-0 invert"
            />
          </div>
          <div className="flex-1 bg-accent rounded-lg p-4">
            <EditableText
              value={title}
              onChange={setTitle}
              className="text-lg font-bold text-accent-foreground"
              placeholder="Enter page title..."
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          {/* Sections */}
          <div className="space-y-0">
            {sections.map((section) => (
              <CollapsibleSection
                key={section.id}
                section={section}
                onUpdate={handleSectionUpdate}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                isSelected={selectedSectionId === section.id}
                onSelect={handleSectionSelect}
              />
            ))}
          </div>

          {/* Add Section Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAddSection}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-3 bg-primary rounded-b-lg mt-6" />

        {/* Instructions */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Instructions:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click on any text to edit it directly</li>
            <li>• Click on a section to select it and see action buttons</li>
            <li>• Use the copy button to duplicate selected sections</li>
            <li>• Use the trash button to delete selected sections</li>
            <li>• Press Enter to save text changes, or Escape to cancel</li>
          </ul>
        </div>
      </div>
    </div>
  );
};