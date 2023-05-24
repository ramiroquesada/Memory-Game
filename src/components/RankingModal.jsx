import Modal from 'react-modal';

import {
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useUiStore } from '../hooks/useUiStore';
import { useEffect } from 'react';
import { useMemo } from 'react';
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
			onRequestClose={handleCloseRankingModal}>

				<div className='modalContainer' style={{margin: '1rem 0'}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Tiempo</TableCell>
							<TableCell>Clicks</TableCell>
							<TableCell>Fecha</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{gameModeRecords?.map((record) => (
							<TableRow key={record._id}>
								<TableCell>
									{gameModeRecords?.indexOf(record) + 1}º
								</TableCell>
								<TableCell>{record.name}</TableCell>
								<TableCell>
									{record.time.minutes}:{record.time.seconds}:{record.time.miliseconds}
								</TableCell>
								<TableCell>{record.clicks}</TableCell>
								<TableCell>{formatDate(record.date)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Modal>
	);
};
