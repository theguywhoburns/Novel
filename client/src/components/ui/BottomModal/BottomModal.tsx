import { useEffect, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import {
  useOverlay,
  useModal,
  OverlayProvider,
  FocusScope,
  useDialog,
} from 'react-aria';
import { Sheet } from "react-modal-sheet";
import './BottomModal.css';
interface IBottomModalProps extends React.PropsWithChildren  {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	name: string;
};

export const BottomModal = ({children, isOpen, setIsOpen, name, ...props} : IBottomModalProps) => {
	const sheetState = useOverlayTriggerState({});
	useEffect(() => {
		if (isOpen) {
			sheetState.open();
		}
	}, [isOpen, sheetState]);
	return (
		<div onClick={(e) => e.preventDefault()}>
			<Sheet onClick={(e) => e.preventDefault()} isOpen={sheetState.isOpen} onClose={() => {setIsOpen(false); sheetState.close();}}>
				<OverlayProvider>
					<FocusScope contain autoFocus restoreFocus>
						<SheetComp name={name} sheetState={sheetState} setIsOpen={setIsOpen} {...props}>
							{children}
						</SheetComp>
					</FocusScope>
				</OverlayProvider>
			</Sheet>
		</div>
	);
}

function SheetComp({ sheetState, name, setIsOpen, ...props } : IBottomModalProps | any) {
	const containerRef = useRef(null);
	const dialog = useDialog({}, containerRef);
	const overlay = useOverlay(
		{	
			onClose: () => {setIsOpen(false); sheetState.close()},
			isOpen: true,
			isDismissable: true
		},
		containerRef
	);

	useModal();

	return (
		<>
			<Sheet.Container
				{...overlay.overlayProps}
				{...dialog.dialogProps}
				ref={containerRef}
				{...props}
			>
				<Sheet.Header>
					<span>{name}</span>
				</Sheet.Header>
				<Sheet.Content>
					{props.children}
				</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</>
	);
}
