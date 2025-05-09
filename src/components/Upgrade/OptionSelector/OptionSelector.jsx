import { Section, Title, Select, OptionButton } from './OptionSelectorStyle.js';

const OptionSelector = ({ title, options, onSelect, disabled }) => (
    <Section>
        <Title>{title}</Title>
        <Select>
            {options.map(opt => (
                <OptionButton
                    key={opt.value}
                    disabled={disabled}
                    onClick={() => onSelect(opt.value)}
                >
                    {opt.label}
                </OptionButton>
            ))}
        </Select>
    </Section>
);

export default OptionSelector;
