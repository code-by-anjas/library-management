import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

export const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className='relative'>
      <HexColorPicker
        className='min-w-full'
        color={value}
        onChange={onPickerChange}
      />
      <div className='mt-2 flex flex-row items-center rounded-xl border px-3 py-2'>
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className='hex-input'
        />
      </div>
    </div>
  );
};
