"""empty message

Revision ID: c82db2022345
Revises: a042f317ca03
Create Date: 2024-11-23 16:30:03.028487

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c82db2022345'
down_revision: Union[str, None] = 'a042f317ca03'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('assets', sa.Column('start_host_scan_at', sa.DateTime(), nullable=True))
    op.add_column('assets', sa.Column('end_host_scan_at', sa.DateTime(), nullable=True))
    op.drop_constraint('host_scans_asset_id_fkey', 'host_scans', type_='foreignkey')
    op.create_foreign_key(None, 'host_scans', 'assets', ['asset_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'host_scans', type_='foreignkey')
    op.create_foreign_key('host_scans_asset_id_fkey', 'host_scans', 'assets', ['asset_id'], ['id'], ondelete='SET NULL')
    op.drop_column('assets', 'end_host_scan_at')
    op.drop_column('assets', 'start_host_scan_at')
    # ### end Alembic commands ###