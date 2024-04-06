Architecture Docs
=================

The architecture docs are based on GitLab's process, which is documented `here <https://handbook.gitlab.com/handbook/engineering/architecture/workflow/>`_.

The idea is that features are documented before coding begins, and after completion, the code links back to design documents to provide a high-level description of how things work for those who are new to the codebase.

All of the features documented in the ``architecture`` folder will follow this basic flow:

.. mermaid::

    flowchart LR
        proposed --> accepted
        accepted --> ongoing
        ongoing --> implemented
        proposed --> rejected
        ongoing --> postponed
        postponed --> ongoing

.. toctree::
   :maxdepth: 1
   :caption: Contents:

   example/index
