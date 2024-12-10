import { useEffect, useRef } from 'react';
import {
	FocusScope,
	OverlayProvider,
	useDialog,
	useModal,
	useOverlay,
} from 'react-aria';
import { Sheet } from 'react-modal-sheet';
import { useOverlayTriggerState } from 'react-stately';
import { Separator } from '../Separator/Separator';
import './BottomModal.css';
interface IBottomModalProps extends React.PropsWithChildren {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	name: string;
}

export const BottomModal = ({
	children,
	isOpen,
	setIsOpen,
	name,
	...props
}: IBottomModalProps) => {
	const sheetState = useOverlayTriggerState({});

	useEffect(() => {
		if (isOpen) {
			sheetState.open();
		}
	}, [isOpen, sheetState]);

	return (
		<Sheet
			onClick={e => e.preventDefault()}
			isOpen={sheetState.isOpen}
			onClose={() => {
				setIsOpen(false);
				sheetState.close();
			}}
		>
			<OverlayProvider>
				<FocusScope contain autoFocus restoreFocus>
					<SheetComp
						name={name}
						sheetState={sheetState}
						setIsOpen={setIsOpen}
						{...props}
					>
						{children}
					</SheetComp>
				</FocusScope>
			</OverlayProvider>
		</Sheet>
	);
};

function SheetComp({
	sheetState,
	name,
	setIsOpen,
	...props
}: IBottomModalProps | any) {
	const containerRef = useRef(null);
	const dialog = useDialog({}, containerRef);
	const overlay = useOverlay(
		{
			onClose: () => {
				setIsOpen(false);
				sheetState.close();
			},
			isOpen: true,
			isDismissable: true,
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
				<Sheet.Header style={{ display: 'flex', flexDirection: 'column' }}>
					<Separator marginY={[10, 10]} variant='dragLine' />
					<h3 className='title'>{name}</h3>
				</Sheet.Header>
				<Sheet.Content>{props.children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</>
	);
}
