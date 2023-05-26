import { useEffect, useMemo } from 'react';
import Modal from 'react-modal';

import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';
import { formatDate } from '../helpers/formatDate';

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
	const {
		startGettingOnlineRecords,
		isRecordsModalOpen,
		closeModalRecords,
		gameMode,
		onlineRecords,
	} = useUiStore();

	const handleCloseRankingModal = () => {
		closeModalRecords();
	};

	const gameModeRecords = useMemo(() => {
		if (gameMode == 1) {
			return onlineRecords?.clickAllRecords;
		} else if (gameMode == 2) {
			return onlineRecords?.memoryRecords;
		}
	});

	useEffect(() => {
		if (!onlineRecords) {
			startGettingOnlineRecords();
		}
	}, [onlineRecords]);

	return (
		<Modal
			isOpen={isRecordsModalOpen}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
			onRequestClose={handleCloseRankingModal}
			>
			<Paper >
				<TableContainer sx={{maxHeight: 500}}>
					<Table stickyHeader >
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell align="center">Nombre</TableCell>
								<TableCell align="center">Tiempo</TableCell>
								<TableCell align="center">Clicks</TableCell>
								<TableCell align="center">Fecha</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{gameModeRecords?.map((record) => (
								<TableRow key={record._id} hover>
									<TableCell align="left">
										{gameModeRecords?.indexOf(record) + 1}º
									</TableCell>
									<TableCell align="center">
										{record.name}
									</TableCell>
									<TableCell align="center">
										{record.time.minutes}:
										{record.time.seconds}:
										{record.time.miliseconds}
									</TableCell>
									<TableCell align="center">
										{record.clicks}
									</TableCell>
									<TableCell align="center">
										{formatDate(record.date)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Modal>
	);
};
