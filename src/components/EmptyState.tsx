import React from 'react';
import { PackageX } from 'lucide-react'; // Örnek bir ikon
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function EmptyState({ icon: Icon = PackageX, title, description, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
      <Icon className="h-16 w-16 mb-4 text-gray-400 dark:text-gray-600" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-6 max-w-md">{description}</p>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}