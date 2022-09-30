import { useDispatch, useSelector } from 'react-redux';
import {
    AttributeEntity,
    CreateJobRequest,
    JobSearchRequest,
    ChangeCandidateStatusRequest,
    UpdateHiringManagerRequest,
    PaginationRequest,
    JobNotificationsRequest
} from 'types/Jobs';
import { RootState } from '../../store';
import {
    getAllTracksForJobsAction,
    getTrackTreeAction,
    createJobAction,
    getJobsAction,
    getJobCandidatesAction,
    createCandidateAction,
    changeCandidateStatusAction,
    updateHiringManagerAction,
    getJobDeskAction
} from 'actions/hiringManager/jobs/jobsActions';

const useJobDispatcher = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const { expertId, companyName: companyProvide } = auth.user;
    const dispatch = useDispatch();

    const getAllTracksForJob = () => {
        dispatch(getAllTracksForJobsAction({ expertId }));
    };

    const getTrackTree = (trackId: string) => {
        dispatch(getTrackTreeAction({ trackId, expertId }));
    }

    const getJobs = (request?: JobSearchRequest) => {
        const req = request ? { ...request, expertId } : { expertId };
        dispatch(getJobsAction(req));
    }

    const getJobCandidates = ({ jobId }: { jobId: string }) => {
        dispatch(getJobCandidatesAction({ expertId, jobId }));
    }

    const createJob = (request: any) => {
        const { checkedNodes, trackTree, ...formValues } = request;
        const attributes = getAttributesForCreateJob(checkedNodes, trackTree);

        const createJobRequest: CreateJobRequest = {
            ...formValues, expertId, companyProvide, attributes
        }

        dispatch(createJobAction(createJobRequest));
    }

    const createCandidate = ({ email, jobId }: { email: string, jobId: string }) => {
        const request = { email, jobId, expertId };
        dispatch(createCandidateAction(request));
    }

    const changeCandidateStatus = ({ candidateId, jobId, status }: Omit<ChangeCandidateStatusRequest, 'expertId'>) => {
        dispatch(changeCandidateStatusAction({ candidateId, jobId, status, expertId }));
    }

    const updateHiringManager = (request: Omit<UpdateHiringManagerRequest, 'expertId'>) => {
        dispatch(updateHiringManagerAction({ ...request, expertId }));
    }

    const getJobDesk = (request: Omit<PaginationRequest, 'expertId'>) => {
        dispatch(getJobDeskAction({ ...request, expertId }));
    }

    const getJobNotifications = (request: Omit<JobNotificationsRequest, 'expertId'>) => {
        dispatch(getJobDeskAction({ ...request, expertId }));
    }

    return {
        getAllTracksForJob,
        getTrackTree,
        createJob,
        getJobs,
        getJobCandidates,
        createCandidate,
        changeCandidateStatus,
        updateHiringManager,
        getJobDesk,
        getJobNotifications,
    };
}

export default useJobDispatcher;

export const jobTypes = [
    { key: 'REMOTE', value: 'Remote' },
    { key: 'HYBRID', value: 'Hybrid' },
    { key: 'ONSITE', value: 'Onsite' }
];

const getAttributesForCreateJob = (checkedNodes: any, trackTree: any) => {
    const categories: string[] = [];
    const attributes: AttributeEntity[] = [];

    checkedNodes.forEach((node: any) => {
        const { key, title } = node;
        const [categoryId, categoryType, subCategoryId, subCategoryType] = key.split('-');
        const category = trackTree.find((tree: any) => tree.categoryId === categoryId);
        const { key: subCategoryName } = title.props.children;

        if (subCategoryId && category) {
            const { categoryName } = category;
            if (categories.includes(categoryId)) {
                const entityObj = attributes.find(o => o.entityId === categoryId);
                const subCategoryObj = {
                    entity: subCategoryType,
                    entityTitle: subCategoryName,
                    entityId: subCategoryId,
                };
                entityObj?.children?.push(subCategoryObj);
            } else {
                const entityObj = {
                    entity: categoryType,
                    entityTitle: categoryName,
                    entityId: categoryId,
                    children: [{
                        entity: subCategoryType,
                        entityTitle: subCategoryName,
                        entityId: subCategoryId,
                    }]
                };
                categories.push(categoryId);
                attributes.push(entityObj);
            }
        }
    });

    return attributes;
}