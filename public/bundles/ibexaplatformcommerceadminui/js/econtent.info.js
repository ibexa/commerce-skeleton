(function(global, doc, eZ, Routing, $) {
    const INTERVAL = 10000;
    const liveTablesContainer = doc.querySelector('.ez-live-tables');
    const temporaryTablesContainer = doc.querySelector('.ez-temporary-tables');
    const swapWrapper = doc.querySelector('.ez-swap-tables__swap-wrapper');
    const inProgressNode = doc.querySelector('.ez-swap-tables__in-progress');
    const notPossibleNode = doc.querySelector('.ez-swap-tables__not-possible');
    const importActiveNode = doc.querySelector('.ez-swap-tables__import-active');
    const swapTablesButton = doc.querySelector('.ez-swap-tables__btn-swap');
    const backupAlert = doc.querySelector('.ez-alert--backup');
    const backupDirNode = doc.querySelector('.ez-backup__dir');
    const backupOptionsWrapper = doc.querySelector('.ez-backup__options-wrapper');
    const backupInputName = doc.querySelector('.ez-backup__input-name');
    const backupExportButton = doc.querySelector('.ez-btn--export');
    const backupExportStartedNode = doc.querySelector('.ez-backup__export-started');
    const backupImportInProgress = doc.querySelector('.ez-import-backup__import-in-progress');
    const backupImportNoFiles = doc.querySelector('.ez-import-backup__no-files');
    const backupImportOptionsWrapper = doc.querySelector('.ez-import-backup__options-wrapper');
    const backupImportList = doc.querySelector('.ez-import-backup__list');
    const backupImportButton = doc.querySelector('.ez-btn--import');
    const jobsList = doc.querySelector('.ez-table--jobs-list');
    const activeJobsList = doc.querySelector('.ez-table--active-jobs tbody');
    const econtentTypes = doc.querySelector('.ez-econtent-types');
    const showJobModal = doc.querySelector('.ez-modal--show-job');
    let econtentInfo = {};
    let backupData = {};
    let swapInProgress = false;
    let importAllowed = false;
    const startExport = () => {
        const url = Routing.generate('siso_admin_econtent_start_export', {
            name: backupInputName.value,
        });

        backupExportStartedNode.classList.remove('ez-backup__export-started--hidden');

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(fetchBackupList)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const startImport = () => {
        const name = doc.querySelector('.ez-import-backup__list input:checked').value;
        const url = Routing.generate('siso_admin_econtent_start_import', {
            name,
        });

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(() => {
                backupImportInProgress.classList.remove('ez-import-backup__import-in-progress--hidden');
                backupImportOptionsWrapper.classList.add('ez-import-backup__options-wrapper--hidden');
            })
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const startJob = (event) => {
        const jobIdentifier = event.currentTarget.dataset.jobIdentifier;
        const url = Routing.generate('siso_admin_start_job', {
            job_id: jobIdentifier,
        });

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const removeJob = (id) => {
        const url = Routing.generate('siso_admin_econtent_remove_job', {
            id,
        });

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const swapTables = () => {
        const url = Routing.generate('siso_admin_econtent_swap');

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getStatusFromResponse)
            .then(fetchEcontentInfo)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const fetchEcontentInfo = () => {
        const url = Routing.generate('siso_admin_econtent_info');

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(setEcontentData)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const fetchJobs = () => {
        const url = Routing.generate('siso_admin_econtent_job_data');

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(setJobsData)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const fetchBackupList = () => {
        const url = Routing.generate('siso_admin_econtent_backuplist');

        fetch(url, { mode: 'same-origin', credentials: 'same-origin' })
            .then(eZ.helpers.request.getJsonFromResponse)
            .then(setBackupListData)
            .catch(eZ.helpers.notification.showErrorNotification);
    };
    const renderTablesData = (types, listContainer, hiddenClass) => {
        const template = listContainer.dataset.template;
        const fragment = doc.createDocumentFragment();
        const methodName = !!types.length ? 'remove' : 'add';

        types.forEach((type) => {
            const renderedItem = template.replace('{{ class_name }}', type.class_name).replace('{{ count }}', type.count);
            const container = doc.createElement('ul');

            container.insertAdjacentHTML('beforeend', renderedItem);

            fragment.append(container.querySelector('li'));
        });

        listContainer.innerHTML = '';
        listContainer.append(fragment);

        listContainer.classList[methodName](hiddenClass);
    };
    const renderBackupItems = () => {
        const template = backupImportList.dataset.template;
        const fragment = doc.createDocumentFragment();

        backupData.backup.forEach((backup) => {
            const renderedItem = template
                .replace(/{{ name }}/g, backup.name)
                .replace('{{ date }}', backup.date)
                .replace('{{ size }}', backup.size);
            const container = doc.createElement('div');

            container.insertAdjacentHTML('beforeend', renderedItem);
            container.querySelector('input').addEventListener('change', engableImportButton, false);

            fragment.append(container.querySelector('label'));
        });

        backupImportList.innerHTML = '';
        backupImportList.append(fragment);

        if (importAllowed) {
            backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
            backupImportOptionsWrapper.classList.remove('ez-import-backup__options-wrapper--hidden');
        }
    };
    const renderAddJobs = (jobs) => {
        const template = jobsList.dataset.template;
        const fragment = doc.createDocumentFragment();

        Object.entries(jobs).forEach(([jobIdentifier, jobData]) => {
            const renderedItem = template
                .replace('{{ label }}', jobData.label)
                .replace('{{ desc }}', jobData.desc)
                .replace('{{ job_identifier }}', jobIdentifier);
            const container = doc.createElement('tbody');

            container.insertAdjacentHTML('beforeend', renderedItem);
            container.querySelector('button').addEventListener('click', startJob, false);

            fragment.append(container.querySelector('tr'));
        });

        jobsList.querySelectorAll('.ez-table__job-item').forEach((jobItem) => jobItem.remove());

        if (fragment.children.length) {
            jobsList.append(fragment);
        }
    };
    const renderTypes = (types) => {
        const template = econtentTypes.dataset.template;
        const fragment = doc.createDocumentFragment();

        Object.entries(types).forEach(([name, values]) => {
            const renderedItem = template.replace('{{ name }}', name);
            const container = doc.createElement('div');

            container.insertAdjacentHTML('beforeend', renderedItem);

            const tableNode = container.querySelector('table');
            const rowTemplate = tableNode.dataset.template;

            values.forEach((attributes) => {
                const renderedItem = rowTemplate
                    .replace('{{ attribute_name }}', attributes.attribute_name)
                    .replace('{{ attribute_id }}', attributes.attribute_id)
                    .replace('{{ ezdatatype }}', attributes.ezdatatype)
                    .replace('{{ mapping }}', attributes.mapping ? `$productNode->${attributes.mapping.attribute}` : '');
                const container = doc.createElement('tbody');

                container.insertAdjacentHTML('beforeend', renderedItem);

                tableNode.append(container.querySelector('tr'));
            });

            fragment.append(container);
        });

        econtentTypes.innerHTML = '';
        econtentTypes.append(fragment);
    };
    const renderJobs = (jobs) => {
        const template = activeJobsList.dataset.template;
        const noContentTemplate = activeJobsList.dataset.templateNoContent;
        const fragment = doc.createDocumentFragment();

        jobs.forEach((job) => {
            const renderedItem = template
                .replace('{{ id }}', job.id)
                .replace('{{ command }}', job.command)
                .replace('{{ state }}', job.state)
                .replace('{{ createdAt }}', job.createdAt)
                .replace('{{ runtime }}', job.runtime ? `${job.runtime}s` : '')
                .replace('{{ queue }}', job.queue);
            const container = doc.createElement('tbody');

            container.insertAdjacentHTML('beforeend', renderedItem);
            container.querySelector('.ez-btn--view').addEventListener('click', showJob.bind(null, job.args, job.output, job.error), false);
            container.querySelector('.ez-btn--remove').addEventListener('click', removeJob.bind(null, job.id), false);

            fragment.append(container.querySelector('tr'));
        });

        if (fragment.children.length) {
            activeJobsList.innerHTML = '';
            activeJobsList.append(fragment);
        } else {
            activeJobsList.innerHTML = noContentTemplate;
        }
    };
    const hideAllSwapTables = () => {
        swapWrapper.classList.add('ez-swap-tables__swap-wrapper--hidden');
        inProgressNode.classList.add('ez-swap-tables__in-progress--hidden');
        notPossibleNode.classList.add('ez-swap-tables__not-possible--hidden');
        importActiveNode.classList.add('ez-swap-tables__import-active--hidden');
    };
    const setEcontentData = (data) => {
        econtentInfo = data;

        renderTablesData(data.productive, liveTablesContainer, 'ez-live-tables--hidden');
        renderTablesData(data.tmp, temporaryTablesContainer, 'ez-temporary-tables--hidden');
        renderTypes(data.types);
    };
    const setJobsData = (data) => {
        hideAllSwapTables();
        renderAddJobs(data.addJobs);
        renderJobs(data.jobs);

        importAllowed = data.importAllowed;

        if (!data.importAllowed) {
            importActiveNode.classList.remove('ez-swap-tables__import-active--hidden');
            backupImportInProgress.classList.remove('ez-import-backup__import-in-progress--hidden');
            backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
            backupImportOptionsWrapper.classList.add('ez-import-backup__options-wrapper--hidden');

            return;
        }

        backupImportNoFiles.classList.add('ez-import-backup__no-files--hidden');
        backupImportOptionsWrapper.classList.remove('ez-import-backup__options-wrapper--hidden');

        if (econtentInfo.tmp && !econtentInfo.tmp.length) {
            notPossibleNode.classList.remove('ez-swap-tables__not-possible--hidden');

            return;
        }

        if (swapInProgress) {
            inProgressNode.classList.remove('ez-swap-tables__in-progress--hidden');

            return;
        }

        swapWrapper.classList.remove('ez-swap-tables__swap-wrapper--hidden');
    };
    const setBackupListData = (data) => {
        backupData = data;

        backupDirNode.innerText = data.dir;

        if (data.msg !== '') {
            backupAlert.innerText = data.msg;
            backupAlert.classList.remove('ez-alert--hidden');

            return;
        }

        if (!!data.backup.length) {
            renderBackupItems();
        }

        backupOptionsWrapper.classList.remove('ez-backup__options-wrapper--hidden');
    };
    const toggleExportButton = (event) => {
        const methodName = event.currentTarget.value === '' ? 'setAttribute' : 'removeAttribute';

        backupExportButton[methodName]('disabled', 'disabled');
    };
    const engableImportButton = () => {
        backupImportButton.removeAttribute('disabled');
    };
    const showJob = (args, output, error) => {
        const argsNode = showJobModal.querySelector('.ez-modal__args');
        const outputNode = showJobModal.querySelector('.ez-modal__output-wrapper');
        const errorNode = showJobModal.querySelector('.ez-modal__error-wrapper');

        argsNode.innerHTML = args;
        outputNode.innerHTML = output;
        errorNode.innerHTML = error;

        $(showJobModal).modal('show');
    };

    if (!swapTablesButton) {
        return;
    }

    swapTablesButton.addEventListener('click', swapTables, false);
    backupInputName.addEventListener('keyup', toggleExportButton, false);
    backupExportButton.addEventListener('click', startExport, false);
    backupImportButton.addEventListener('click', startImport, false);

    fetchEcontentInfo();
    fetchJobs();
    fetchBackupList();

    global.setInterval(fetchEcontentInfo, INTERVAL);
    global.setInterval(fetchJobs, INTERVAL);
})(window, window.document, window.eZ, window.Routing, window.jQuery);
