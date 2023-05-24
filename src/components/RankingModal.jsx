import Modal from 'react-modal';

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useUiStore } from "../hooks/useUiStore"

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: '50%',
		bottom: '50%',
	},
};

Modal.setAppElement('#root');

export const RankingModal = () => {

	const { startGettingOnlineRecords, isRecordsModalOpen, closeModalRecords, gameMode } = useUiStore()

	// const onlineRecords = startGettingOnlineRecords();

	// console.log(onlineRecords)

	const handleCloseRankingModal = () => {
		closeModalRecords()
	}
	

	return (
		
		
		<Modal
			isOpen={isRecordsModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			onRequestClose={handleCloseRankingModal}>
				
			<TableContainer component={Paper} >
				<Table >
					<TableHead>
						<TableRow>
							<TableCell>Nº</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Tiempo</TableCell>
							<TableCell>Clicks</TableCell>
							<TableCell>Fecha</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Soon</TableCell>
							<TableCell>Soon</TableCell>
							<TableCell>Soon</TableCell>
							<TableCell>Soon</TableCell>
							<TableCell>Soon</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>


		</Modal>
	)
}
