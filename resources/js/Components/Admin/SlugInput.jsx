import { useEffect, useState } from 'react';
import { FormInput } from '@/Components/Admin/FormField';
import { slugify } from '@/Utils/slugify';

export default function SlugInput({ label = 'Slug', source, value, onChange, error, hint }) {
    const [manual, setManual] = useState(() => (value ?? '') !== slugify(source));

    useEffect(() => {
        if (manual) return;

        const next = slugify(source);
        if (next !== value) {
            onChange(next);
        }
    }, [source, manual, value, onChange]);

    const handleChange = (e) => {
        const filtered = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');

        setManual(filtered !== '');
        onChange(filtered);
    };

    const handleBlur = () => {
        const cleaned = value.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        if (cleaned !== value) {
            onChange(cleaned);
        }
    };

    const description = hint !== undefined ? hint : '';

    return (
        <FormInput
            label={label}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            description={description}
        />
    );
}
